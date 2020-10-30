import React from 'react'
let Coverflow = require('react-coverflow');

let fn = function () {
  /* do you want */  
}

export default function CoverFlow(props){
    const images = props.playlists.map((playlist) => 
        <img key={playlist._id} src={playlist.videos[0].poster} alt={playlist.title} data-action="https://facebook.github.io/react/"/>
    )
    return (
        <Coverflow
        width={960}
        height={960}
        displayQuantityOfSide={2}
        navigation={false}
        enableHeading={true}
      >
        <div
          onClick={() => fn()}
          onKeyDown={() => fn()}
          role="menuitem"
          tabIndex="0"
        >
            <img
                key={0}
                src=''
                alt=""
                style={{ display: 'block', width: '100%' }}
            />
        </div>
    
        
            {images}

           
                        
            
            
            

        </Coverflow>

    )
}
