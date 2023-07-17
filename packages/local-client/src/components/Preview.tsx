
import React, { useEffect, useRef } from 'react';

import "./Preview.css";

interface PreviewProps {
    code: string;
    err: string;
}


/**
     *  Direct access between frames is allowed when..
     *  the iframe element doesn't have 'sandbox' property or has a 'sandbox="allow-same-origin"' property.
     *                  AND
     *   when fetch the parent HTML doc from the exact same
     *    Domain 
     *    Port 
     *   protocol (http vs https)
*/

const html = `
 <html lang="en">
   <head>
        <style>html {background-color:white;}</style>
   </head>
   <body>
       <div id="root"></div>
     <script>
        const handleError = (err) =>{
            const root  = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4> Runtime Error </h4>' + err + '</div>'
            console.error('here',err);
        }

        window.addEventListener('error',(event)=>{
            event.preventDefault();
            handleError(event.error); 
        })

        window.addEventListener('message',(event)=>{
         try{
             eval(event.data);
         }catch(err){
            handleError(err); 
         }
     },false)
     </script>
   </body> 
 </html>
 `


const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcDoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                title="preview"
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts">
            </iframe>
            {
                err && <div className="preview-error">
                    {err}
                </div>
            }
        </div>
    )
}

export default Preview;