import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './app/layout/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


/* 

We can see JavaScript code above document.getElementById('')

This basically calls in our application with the id of 'root' 

createRoot() is react functionality. 

.render() effectively renders our react application.

In this case, our react application starts in 'Strict' mode and then renders our app component. 

*/ 