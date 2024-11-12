import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import {
    MdFormatBold, MdFormatListBulleted, MdFormatQuote, MdFormatItalic, MdFormatUnderlined, MdCode,
    MdFormatListNumbered, MdOutlineStrikethroughS, MdImage, MdFormatAlignLeft, MdFormatAlignRight,
    MdFormatAlignCenter, MdFormatAlignJustify, MdUndo, MdRedo, MdAddLink
} from "react-icons/md";
import { LiaHeadingSolid } from "react-icons/lia";
import { VscHorizontalRule } from "react-icons/vsc";

const TipTap = ({ setContent, content }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Underline,
            Placeholder.configure({ placeholder: 'Type Text Here' }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                },
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            setContent(json);
        },
        editorProps: {
            attributes: { class: 'prose focus:outline-none max-w-none' }
        }
    });

    useEffect(() => {
        if (editor && content && content.type === 'doc') {
            editor.commands.setContent(content);
        }
    }, [content, editor]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleHeading = (level) => {
        editor.chain().focus().toggleHeading({ level }).run();
        setIsDropdownOpen(false);
    };
    const handleParagraph = () => {
        editor.chain().focus().setParagraph().run();
        setIsDropdownOpen(false);
    };

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL', previousUrl || 'https://');

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const MenuBar = () => {
        if (!editor) return null;

        return (
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="px-4 py-2 border rounded bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors flex items-center space-x-2"
                    >
                        <LiaHeadingSolid size={20} />
                        <span>Headings</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-40 mt-2 bg-white border rounded shadow-lg">
                            {[1, 2, 3, 4, 5, 6].map(level => (
                                <button key={level} onClick={() => handleHeading(level)} className="dropdown-item">Heading {level}</button>
                            ))}
                            <button onClick={handleParagraph} className="dropdown-item">Paragraph</button>
                        </div>
                    )}
                </div>
                {[
                    { icon: <MdFormatBold size={20} />, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
                    { icon: <MdFormatItalic size={20} />, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
                    { icon: <MdFormatUnderlined size={20} />, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline') },
                    { icon: <MdFormatQuote size={20} />, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
                    { icon: <MdFormatListBulleted size={20} />, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
                    { icon: <MdFormatListNumbered size={20} />, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
                    { icon: <MdCode size={20} />, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock') },
                    { icon: <VscHorizontalRule size={20} />, action: () => editor.chain().focus().setHorizontalRule().run(), isActive: false },
                    { icon: <MdOutlineStrikethroughS size={20} />, action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike') },
                    { icon: <MdImage size={20} />, action: addImage, isActive: false },
                    { icon: <MdFormatAlignLeft size={20} />, action: () => editor.chain().focus().setTextAlign('left').run(), isActive: editor.isActive({ textAlign: 'left' }) },
                    { icon: <MdFormatAlignRight size={20} />, action: () => editor.chain().focus().setTextAlign('right').run(), isActive: editor.isActive({ textAlign: 'right' }) },
                    { icon: <MdFormatAlignCenter size={20} />, action: () => editor.chain().focus().setTextAlign('center').run(), isActive: editor.isActive({ textAlign: 'center' }) },
                    { icon: <MdFormatAlignJustify size={20} />, action: () => editor.chain().focus().setTextAlign('justify').run(), isActive: editor.isActive({ textAlign: 'justify' }) },
                    { icon: <MdUndo size={20} />, action: () => editor.chain().focus().undo().run(), isActive: false },
                    { icon: <MdRedo size={20} />, action: () => editor.chain().focus().redo().run(), isActive: false },
                    {
                        icon: <MdAddLink size={20} />,
                        action: () => {
                            if (editor.isActive('link')) {
                                editor.chain().focus().unsetLink().run();
                            } else {
                                setLink();
                            }
                        },
                        isActive: editor.isActive('link')
                    }
                ].map(({ icon, action, isActive }, index) => (
                    <button
                        key={index}
                        onClick={action}
                        className={`px-4 py-2 border rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 transition-colors disabled:opacity-50`}
                    >
                        {icon}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <MenuBar />
            <EditorContent editor={editor} className="border border-gray-300 p-4 rounded-lg" />
        </div>
    );
};

export default TipTap;
