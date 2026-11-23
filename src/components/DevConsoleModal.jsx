import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { launchConfetti } from '../utils/confetti';

export default function DevConsoleModal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: "=== BAO DINH GRADUATION DEV CONSOLE v2026.11 ===", type: "header" },
    { text: "Nhập 'help' để xem danh sách các lệnh khả dụng.", type: "system" }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      sound.playTap();

      const newHistory = [...history, { text: `bao-dinh@graduation:~$ ${input}`, type: "command" }];

      switch (cmd) {
        case 'help':
          newHistory.push(
            { text: "Danh sách lệnh:", type: "info" },
            { text: "  whoami        - Xem profile cử nhân IT Đinh Nguyễn Gia Bảo", type: "text" },
            { text: "  git log       - Lịch sử commit 4 năm tại KHTN", type: "text" },
            { text: "  locate-bao    - Tọa độ và địa điểm đón khách của Bảo", type: "text" },
            { text: "  confetti      - Bắn pháo hoa ăn mừng tốt nghiệp!", type: "text" },
            { text: "  sudo graduate - Quyền root cấp bằng tốt nghiệp", type: "text" },
            { text: "  contact       - Thông tin hotline & Zalo", type: "text" },
            { text: "  clear         - Xóa sạch màn hình", type: "text" },
            { text: "  exit          - Đóng console", type: "text" }
          );
          break;

        case 'whoami':
          newHistory.push(
            { text: "🎓 Tên: Đinh Nguyễn Gia Bảo (Bảo Đinh)", type: "success" },
            { text: "🏫 Trường: ĐH Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)", type: "text" },
            { text: "💻 Ngành: Công nghệ thông tin (IT)", type: "text" },
            { text: "⚡ Status: Ready to deploy into the industry!", type: "info" }
          );
          break;

        case 'git log':
          newHistory.push(
            { text: "commit c0de01: Year 1 - Hello World, C++ & nộp Wecode thâu đêm", type: "text" },
            { text: "commit c0de02: Year 2 - Data Structures, OOP & cà phê đen đậm đặc", type: "text" },
            { text: "commit c0de03: Year 3 - Internship, Git rebase, fix 1 bug ra 10 bugs", type: "text" },
            { text: "commit c0de04: Year 4 - Thesis passed! Cử nhân CNTT chính thức!", type: "success" }
          );
          break;

        case 'locate-bao':
          newHistory.push(
            { text: "📍 Tọa độ: 10.7632° N, 106.6822° E", type: "info" },
            { text: "🏫 Sân trường KHTN - 227 Nguyễn Văn Cừ, P. Chợ Quán, TP.HCM", type: "success" },
            { text: "🕒 Thời gian: 11:00 am - 12:30 pm (T5 26.11.2026)", type: "text" }
          );
          break;

        case 'confetti':
        case 'party':
          launchConfetti();
          sound.playSuccess();
          newHistory.push({ text: "🎉 BOOM! Pháo hoa chúc mừng đã nổ rực rỡ!", type: "success" });
          break;

        case 'sudo graduate':
        case 'sudo make degree':
          launchConfetti();
          sound.playSuccess();
          newHistory.push(
            { text: "[AUTHENTICATED ROOT USER]", type: "info" },
            { text: "🎓 Cấp bằng Cử nhân Công nghệ Thông tin loại Xuất Sắc cho Bảo Đinh!", type: "success" }
          );
          break;

        case 'contact':
          newHistory.push(
            { text: "📞 Hotline: 0358 180 131", type: "text" },
            { text: "💬 Messenger / Zalo: Bảo Đinh", type: "text" }
          );
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'exit':
        case 'quit':
          onClose();
          return;

        case '':
          break;

        default:
          newHistory.push({
            text: `bash: ${cmd}: command not found. Gõ 'help' để xem danh sách lệnh.`,
            type: "error"
          });
          break;
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0f172a] text-slate-100 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden font-mono text-sm flex flex-col h-[480px]">
        {/* Terminal Header */}
        <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-400 ml-2 flex items-center gap-1.5 font-sans">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              bao-dinh@hcmus-it:~ (Bash)
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin">
          {history.map((line, idx) => (
            <div key={idx} className={`leading-relaxed ${
              line.type === 'header' ? 'text-amber-400 font-bold' :
              line.type === 'command' ? 'text-cyan-300 font-semibold' :
              line.type === 'success' ? 'text-emerald-400 font-bold' :
              line.type === 'info' ? 'text-sky-300' :
              line.type === 'error' ? 'text-rose-400' :
              'text-slate-300'
            }`}>
              {line.text}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold">bao-dinh@graduation:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-emerald-400"
              placeholder="gõ 'help'..."
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-950/80 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
          <span>Gợi ý: Thử gõ <button onClick={() => { setInput('whoami'); inputRef.current?.focus(); }} className="text-amber-400 underline hover:text-amber-300">whoami</button>, <button onClick={() => { setInput('confetti'); inputRef.current?.focus(); }} className="text-amber-400 underline hover:text-amber-300">confetti</button>, <button onClick={() => { setInput('git log'); inputRef.current?.focus(); }} className="text-amber-400 underline hover:text-amber-300">git log</button></span>
          <span>Bấm <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">ESC</kbd> hoặc nút đỏ để đóng</span>
        </div>
      </div>
    </div>
  );
}
