"use client";
import React, { useState } from "react";
import TypingText from "../components/TypingText";

export default function ChatPage() {
    const [response, setResponse] = React.useState('');

    return (
        <div>
            <form
                style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.elements.namedItem('message') as HTMLInputElement;
                    const message = input.value;
                    if (!message) return;
                    try {
                        const res = await fetch('http://localhost:3000/api/chat', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ message }),
                        });
                        const data = await res.json();
                        setResponse(data.response || 'レスポンスがありません。');
                    } catch {
                        setResponse('エラーが発生しました。');
                    }
                }}
            >
                <input
                    name="message"
                    type="text"
                    placeholder="メッセージを入力"
                    style={{ flex: 1, padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>
                    送信
                </button>
            </form>
            <div>
                <TypingText
                    text={response}
                    speed={50}
                />
            </div>
        </div>
    );
}