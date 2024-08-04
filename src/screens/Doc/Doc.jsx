import React from 'react'

const Doc = () => {

    function createMarkup(str) {
        return { __html: str };
    }

    function MyComponent({ str, prevView }) {
        return <div className="lesson_content doc">
            <div style={{ display: prevView ? "block" : "none" }} className='content' dangerouslySetInnerHTML={createMarkup(str)} />

        </div>
    }

  return (
    <main className="main doc">
        <h1><span style={{backgroundColor:"yellow"}}>Документация</span> <sub><i>beta</i></sub></h1> 
        <br />
        <p>Данная документация призвана помочь при написании содержания для темы курса.</p>
        <hr />
        <br />
        <h2>Заголовок</h2>
        Для добавления используйте:
        <MyComponent prevView={true} str={`<code class="lcmd"><p>&lt;h1 class="lh1"&gt;Внутри ваш текст&lt;/h1&gt</p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={"<h1 class='lh1'>Внутри ваш текст</h1>"} prevView={true} />
        <br />
        <br />
    <hr />
        <h2>Текст</h2>
        Для добавления обычно текста используйте:
        <MyComponent prevView={true} str={`<code class="lcmd"><p>&lt;p class="lps"&gt;Пример как отображаеться текст.&lt;/p&gt</p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={"<p class='lps'>Пример как отображаеться текст.</p>"} prevView={true} />
        
    <br />
    <hr />
    <h2>Выделение текста</h2>
        Для выделения слова или целого предложения используйте:
        <MyComponent prevView={true} str={`<code class="lcmd"><p>&lt;b&gt;я теперь заметный&lt;/b&gt</p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={"<b>я теперь заметный</b>"} prevView={true} />
        <br />
        <br />
        <hr />
    <h2>Список</h2>
        Для списка в ваше содержание используйте:
        <MyComponent prevView={true} str={`<code class="lcmd"><p>
         
            &lt;ul&gt; <br/>
    &lt;li&gt;Пункт 1&lt;/li&gt;<br/>
&lt;li&gt;Пункт 2&lt;/li&gt;<br/>
&lt;li&gt;Пункт 3&lt;/li&gt;<br/>
&lt;/ul&gt;
            </p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={`<ul>
<li>Пункт 1</li>
<li>Пункт 2</li>
<li>Пункт 3</li>
</ul>
`} prevView={true} />
      
      <br />
      <br />
    <hr />
        <h2>Поле для кода</h2>
        Для добавления кода используйте: (тег p в данном случае будет новой строкой)
        <MyComponent prevView={true} str={`<code class="lcmd"><p>
        &lt;code class='lcmd'&gt;&lt;p&gt;print('Hello world')&lt;/p&gt;&lt;/code&gt;
            </p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={"<code class='lcmd'><p>print('Hello world')</p></code>"} prevView={true} />
        
        <br />
        <br />
    <hr />
        <h2>Видео</h2>
        Видео добавляется с помощью тега iframe: (видео может быть взято с любого видеохостинга который предоставляеть возможноть "встройки" видео по сслыке )
        <MyComponent prevView={true} str={`<code class="lcmd"><p>
            &lt;iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=tSWFgr9dus2SC00g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen&gt;&lt;/iframe&gt;

            </p></code>`} />
        <p>Вывод:</p>
        <MyComponent str={`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Zi_XLOBDo_Y?si=wTCWnhwU3PQ33auX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            `} prevView={true} />
        


    </main>
  )
}

export default Doc