import { useEffect } from 'react';

const SmartsuppChat = () => {
  useEffect(() => {
    // Prevent double loading
    if (window.smartsupp && window.smartsupp.key) return;

    // Set your Smartsupp key
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '0fa91d59810e88532e3dfce97aa16948e1760513';

    // Load the script
    (function(d) {
      var s, c, o = window.smartsupp = function(){ o._.push(arguments); };
      o._ = [];
      s = d.getElementsByTagName('script')[0];
      c = d.createElement('script');
      c.type = 'text/javascript';
      c.charset = 'utf-8';
      c.async = true;
      c.src = 'https://www.smartsuppchat.com/loader.js?';
      s.parentNode.insertBefore(c, s);
    })(document);
  }, []);

  return null; // Nothing to render
};

export default SmartsuppChat;