import React from 'react'

import $ from 'jquery';


export default function Cursor() {
    $(window).mousemove(e => {
        const cursor = $(".cursor");
        cursor.css({
            top: `${e.clientY}px`,
            left: `${e.clientX}px` 
        });
    });

    $(window)
  .mousedown(() => {
      const cursor = $(".cursor");
      cursor.css({
          transform: "scale(.5)"
      });
  })
  .mouseup(() => {
      const cursor = $(".cursor");
      cursor.css({
          transform: "scale(1.2)"
      });
  });
    

    return (
        <div 
            className="cursor"
            
        >
        </div>
    )
}
