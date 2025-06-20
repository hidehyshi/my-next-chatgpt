import { NextResponse } from 'next/server';

const API_DOMAIN = process.env.GPT_API_DOMAIN;
const API_URL=process.env.GPT_API_URL;
const refreshToken = process.env.GPT_REFRESH_TOKEN;
// トークン取得処理（例：外部APIから取得する場合）
async function fetchAccessToken() {
    const res = await fetch(`${API_DOMAIN}/api/token`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${refreshToken}` },
    });
    const data = await res.json();
    console.log("data:", data);
    return data.access_token.token; // 取得したトークンを返す
}

export async function POST(request) {
    try {
        // トークン取得
        const token = await fetchAccessToken();
        // リクエストボディの取得
        const { message } = await request.json();

        // 外部APIのエンドポイント
        const apiUrl = `${API_DOMAIN}${API_URL}`;
        const requestBody = {
            messages: [
                {
                    role: "user",
                    content: `${message}`
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.9
        };

        // 外部APIへリクエスト
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!apiResponse.ok) {
            return NextResponse.json({ error: '外部APIエラー' }, { status: apiResponse.status });
        }
        const responseJson = await apiResponse.json();
        const result = { response : responseJson.choices?.[0]?.message?.content || "応答がありません" };
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}