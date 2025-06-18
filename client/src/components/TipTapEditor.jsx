import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function TipTapEditor({ onSubmit, defaultPost = {}, isEditing = false }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (defaultPost) {
      setTitle(defaultPost?.title || '');
      setContent(defaultPost?.content || '');
      setAuthor(defaultPost?.author || 'Admin');
      setFeaturedImage(defaultPost?.featuredImage || '');
    }
  }, [defaultPost]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  const handleImageInsert = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, author, featuredImage });
  };

  const buttonClass =
    'p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-8 max-w-2xl mx-auto bg-white shadow rounded-lg p-4 sm:p-6"
      autoComplete="off"
    >
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        required
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Featured Image URL"
        value={featuredImage}
        onChange={(e) => setFeaturedImage(e.target.value)}
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        autoComplete="off"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2 border p-2 rounded bg-gray-50">
        <button
          type="button"
          aria-label="Bold"
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={buttonClass}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          aria-label="Italic"
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={buttonClass}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          aria-label="Bullet List"
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={buttonClass}
        >
          • List
        </button>
        <button
          type="button"
          aria-label="Ordered List"
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={buttonClass}
        >
          1. List
        </button>
        <button
          type="button"
          aria-label="Add Link"
          disabled={!editor}
          onClick={() => {
            const url = prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={buttonClass}
        >
          Link
        </button>
      </div>

      {/* Image Insertion */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="flex-grow border p-2 rounded focus:ring-2 focus:ring-blue-400 min-w-0"
        />
        <button
          type="button"
          onClick={handleImageInsert}
          className="bg-gray-200 px-3 rounded hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Image
        </button>
      </div>

      <div className="border rounded p-2 bg-white min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isEditing ? 'Update Post' : 'Publish Post'}
      </button>
    </form>
  );
}