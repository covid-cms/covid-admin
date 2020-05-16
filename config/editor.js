import { state } from '@/helpers/store';
import { apiUrl } from '@/helpers/url';

let accessToken = state().auth.accessToken;

export default {
  default: 'default',

  editors: {
    default: {
      placeholder: 'Nhập nội dung bài viết tại đây',

      simpleUpload: {
        uploadUrl: apiUrl('api/storage'),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },

      image: {
        toolbar: [
          'imageTextAlternative',
          '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'
        ],
        styles: [
          'full',
          'alignLeft',
          'alignRight'
        ]
      },

      alignment: {
        options: [ 'left', 'right', 'center', 'justify']
      },

      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        ]
      },

      toolbar: [
        'heading',
        '|', 'bold', 'italic', 'underline', 'code',
        '|', 'link',
        '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify'
      ],
    },
  }
}
