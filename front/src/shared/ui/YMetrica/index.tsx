export const YMetrica = () => {
    const ym = () => {
        return (
            "<script src='https://mc.yandex.ru/metrika/watch.js' type='text/javascript'></script>\
            <script type='text/javascript'>\
                  try {\
                        var yaCounterXXXXX = new Ya.Metrika({\
                        id:98083861,\
                        clickmap:true,\
                        trackLinks:true,\
                        accurateTrackBounce:true,\
                        webvisor:true,\
                        trackHash:true\
                        });\
                  } catch(e) { console.log(e)}\
            </script>"
        );
    };
    //
    // // <!-- Yandex.Metrika counter -->
    // <script type="text/javascript" >
    //     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    //     m[i].l=1*new Date();
    //     for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    //     k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    //     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    //
    //     ym(98083861, "init", {
    //     clickmap:true,
    //     trackLinks:true,
    //     accurateTrackBounce:true,
    //     webvisor:true
    // });
    // </script>
    // <noscript><div><img src="https://mc.yandex.ru/watch/98083861" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    // <!-- /Yandex.Metrika counter -->
    return (
        <div dangerouslySetInnerHTML={{__html: ym()}}/>
    )
}