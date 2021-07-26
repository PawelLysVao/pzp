// import { ContentState, convertToRaw, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

// export const wysiwygCustomBoxConfig = {
//   options: ['inline', 'list'],
//   inline: {
//     options: ['bold', 'italic']
//   }
// };

// export const orderSendMsgConfig = wysiwygCustomBoxConfig;

// export const mapEditorStateToHtml = (editorState: EditorState): string => {
//   const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

//   return html.replace(/(\r\n|\n|\r)/gm, '');
// };

// export const mapHtmlToEditorState = (html = ''): EditorState => {
//   return EditorState.createWithContent(
//     ContentState.createFromBlockArray(htmlToDraft(html).contentBlocks)
//   );
// };

// export const stripHtml = (content: string): string =>
//   content.replace(/(<([^>]+)>)/gi, '');
