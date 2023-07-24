import React from 'react'
import Link  from 'next/link';
const Anchor = ({children ,funcss , href , text}) => {
return (
  (<Link href={href} className={`navbar-link ${funcss}`}>

    {children} {text}

  </Link>)
);
}
export default Anchor;