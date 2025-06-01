const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;

// Socket.IOの接続処理
io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    // ユーザーが切断したときの処理
    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });

    // チャットメッセージの受信処理
    socket.on('chat message', (msg) => {
        // 全ユーザーにメッセージを送信
        io.emit('chat message', msg);
    });

    // ユーザーが入力中であることを通知
    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
    });

    // ユーザーが入力停止したことを通知
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing');
    });
});

// サーバーの起動
server.listen(PORT, () => {
    console.log(`サーバーが起動しました - http://localhost:${PORT}`);
}); 