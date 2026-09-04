export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('upnited-theme')||((window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
