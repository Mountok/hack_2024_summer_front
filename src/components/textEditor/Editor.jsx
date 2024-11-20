// Editor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импорт стилей Quill
import { AddContentInTheme } from '../../services/theme';
import "./textEditor.scss"

const Editor = () => {
  const [text, setText] = useState('');
  const [theme_id,setThemeId] = useState()

  const handleChange = (value) => {
    setText(value);
    console.log(value)
  };

  const handlePost = (e) => {
    e.preventDefault()
    AddContentInTheme(theme_id,text).then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
  }

  return (
    <div>
      <ReactQuill value={text} onChange={handleChange}
      
      modules={Editor.modules} formats={Editor.formats}/>
   
       <div>
        <h2>Содержимое редактора:</h2>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div> 

      <div className='text_editor_form'>
        <input value={theme_id} onChange={(e)=>{setThemeId(e.target.value)}} type="number" placeholder='введите id темы' />
        <button onClick={handlePost}>Добавить</button>
      </div>

    </div>
  );
};

Editor.modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }], // направление текста
      ['link', 'image', 'video'],
      ['clean'], // кнопка очистки формата
      [{ color: [] }, { background: [] }], // цвет текста и фона
    ],
  };
  
  // Полный набор форматов
  Editor.formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'link',
    'image',
    'video',
    'clean',
    'color',
    'background',
  ];
  

export default Editor;