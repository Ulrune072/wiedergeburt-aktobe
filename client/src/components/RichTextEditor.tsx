import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { useState } from 'react';



function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2.5 py-1.5 text-sm rounded-md transition ${
        active ? 'bg-blue text-white' : 'text-ink/70 hover:bg-ink/5'
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue underline' } }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkValue, setLinkValue] = useState('');


  if (!editor) return null;

  function openLinkModal() {
    setLinkValue(editor!.getAttributes('link').href || '');
    setShowLinkModal(true);
  }

  function confirmLink() {
    let url = linkValue.trim();
    if (url && !/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    if (url) {
      editor!.chain().focus().setLink({ href: url }).run();
    } else {
      editor!.chain().focus().unsetLink().run();
    }
    setShowLinkModal(false);
  }

  return (
    <div className="border border-ink/15 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-0.5 border-b border-ink/10 bg-ink/[0.03] p-1.5">
        <ToolbarButton title="Жирный" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>Ж</b>
        </ToolbarButton>
        <ToolbarButton title="Курсив" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>К</i>
        </ToolbarButton>
        <ToolbarButton title="Подчёркнутый" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>Ч</u>
        </ToolbarButton>
        <ToolbarButton title="Зачёркнутый" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>С</s>
        </ToolbarButton>

        <div className="w-px bg-ink/10 mx-1" />

        <ToolbarButton title="Заголовок 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton title="Заголовок 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>

        <div className="w-px bg-ink/10 mx-1" />

        <ToolbarButton title="Маркированный список" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Список
        </ToolbarButton>
        <ToolbarButton title="Нумерованный список" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. Список
        </ToolbarButton>
        <ToolbarButton title="Цитата" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝ Цитата
        </ToolbarButton>

        <div className="w-px bg-ink/10 mx-1" />

        <ToolbarButton title="Ссылка" active={editor.isActive('link')} onClick={openLinkModal}>
          🔗 Ссылка
        </ToolbarButton>

        <div className="w-px bg-ink/10 mx-1" />

        <ToolbarButton title="Отменить" onClick={() => editor.chain().focus().undo().run()}>
          ↶
        </ToolbarButton>
        <ToolbarButton title="Повторить" onClick={() => editor.chain().focus().redo().run()}>
          ↷
        </ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-3 min-h-[180px] focus:outline-none [&_.ProseMirror]:min-h-[160px] [&_.ProseMirror]:focus:outline-none"
      />
      {showLinkModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-ink text-sm mb-3">Ссылка (URL)</h3>
            <input
              autoFocus
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmLink()}
              placeholder="https://example.com"
              className="w-full border border-ink/15 rounded-lg p-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue"
            />
            <div className="flex gap-2">
              <button
                onClick={confirmLink}
                className="flex-1 bg-blue text-white text-sm font-bold rounded-lg px-3 py-1.5 hover:bg-blue/90 transition"
              >
                Добавить
              </button>
              <button
                onClick={() => setShowLinkModal(false)}
                className="flex-1 border border-ink/20 rounded-lg px-3 py-1.5 text-sm text-ink/70 hover:bg-ink/5 transition"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}