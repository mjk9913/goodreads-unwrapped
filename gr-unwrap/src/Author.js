import React, { useState } from 'react';
import './Author.css';

function Author({uniq,gr_Aut,gr_Book}) {
  return (
    <div className="Page">
        <div className="intro">
            Out of <span className="boldVar">{uniq}</span> different 
            <span className="boldVar"> authors</span> you read from, <br></br>your go to author is:
        </div>
        <div className="authorN">
            {gr_Aut}
        </div>
        <div className="authorC">
            You read a total of <span className="boldVar">{gr_Book}</span> books from the author!
        </div>
    </div>
  );
}

export default Author;
