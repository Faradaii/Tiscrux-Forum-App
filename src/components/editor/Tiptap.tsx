import type { Dispatch, SetStateAction } from 'react';
import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import React, { useEffect } from 'react';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { FaImage, FaAlignJustify, FaAlignRight, FaAlignCenter, FaAlignLeft, FaBold, FaHighlighter, FaItalic, FaStrikethrough } from 'react-icons/fa';

function MenuBar ({ editor }: { editor?: Editor }): JSX.Element {
  const addImage = (): void => {
    const url = window.prompt('URL');

    if (url != null) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex gap-2 text-primary flex-wrap">
      <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={`border rounded p-1 ${editor?.isActive('bold') ? 'is-active' : ''}`}>
        <FaBold />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`border rounded p-1 ${editor?.isActive('italic') ? 'is-active' : ''}`}>
        <FaItalic />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().toggleStrike().run()} className={`border rounded p-1 ${editor?.isActive('strike') ? 'is-active' : ''}`}>
        <FaStrikethrough />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().toggleHighlight().run()} className={`border rounded p-1 ${editor?.isActive('highlight') ? 'is-active' : ''}`}>
        <FaHighlighter />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={`border rounded p-1 ${editor?.isActive('left') ? 'is-active' : ''}`}>
        <FaAlignLeft />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={`border rounded p-1 ${editor?.isActive('center') ? 'is-active' : ''}`}>
        <FaAlignCenter />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={`border rounded p-1 ${editor?.isActive('right') ? 'is-active' : ''}`}>
        <FaAlignRight />
      </button>
      <button type="button" onClick={() => editor?.chain().focus().setTextAlign('justify').run()} className={`border rounded p-1 ${editor?.isActive('justify') ? 'is-active' : ''}`}>
        <FaAlignJustify />
      </button>
      <button type="button" onClick={addImage} className="border rounded p-1 flex gap-2 items-center">
        <FaImage />
        <small className="hidden md:block">Tambahkan Gambar</small>
      </button>
    </div>
  );
}

interface TiptapProps {
  onChange: Dispatch<SetStateAction<string>>
  dangerouslySetInnerHTML: {
    __html: string
  }
}

export default function Tiptap ({ onChange, dangerouslySetInnerHTML }:
TiptapProps): JSX.Element {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      StarterKit,
      Placeholder.configure({
        placeholder: 'Ceritakan ceritamu ...'
      }),
      TextAlign.configure({
        types: ['paragraph']
      }),
      Highlight
    ],
    content: dangerouslySetInnerHTML,
    editorProps: {
      attributes: {
        placeholder: 'body',
        class: 'h-full flex-1 break-all rounded-lg bg-white-light outline-none dark:bg-white-dark placeholder:text-gray-400'
      }
    }
  });

  useEffect(() => {
    const html = editor?.getHTML();
    if (html !== undefined) {
      onChange(html);
    }
  }, [editor, onChange]);

  return (
    <div className="grow flex flex-col">
      <div className="my-2 overflow-auto grow">
        <EditorContent editor={editor} className="h-full" />
      </div>
      <div>
        <MenuBar editor={editor ?? undefined} />
      </div>
    </div>
  );
}