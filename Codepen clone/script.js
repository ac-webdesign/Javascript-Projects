const cssEditor = document.getElementById('cssEditor');
  const htmlEditor = document.getElementById('htmlEditor');
  const jsEditor = document.getElementById('jsEditor');
  const result = document.getElementById('result');
  
  function updateResult() {
    const cssCode = cssEditor.textContent;
    const htmlCode = htmlEditor.textContent;
    const jsCode = jsEditor.textContent;
    
    result.innerHTML = htmlCode;
    const style = document.createElement('style');
    style.textContent = cssCode;
    result.appendChild(style);
    
    const script = document.createElement('script');
    script.textContent = jsCode;
    result.appendChild(script);
  }
  
  cssEditor.addEventListener('input', updateResult);
  htmlEditor.addEventListener('input', updateResult);
  jsEditor.addEventListener('input', updateResult);
  
  updateResult();
  