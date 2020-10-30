import React, { useState } from 'react'
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css'



const Gallery = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const urls = props.playlists.map((playlist) => {
        return playlist.videos[0].poster
    })
    const PHOTOS = urls;
    return (
        <div>
             <button onClick={() => setIsOpen(true)}>
          Open gallery
        </button>
        <ReactBnbGallery
          show={isOpen}
          photos={PHOTOS}
          onClose={() => setIsOpen(false)}
        />
        </div>
    )
}

export default Gallery 
