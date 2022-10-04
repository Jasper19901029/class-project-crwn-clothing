# What is React ?

- 在 React 還沒有出來之前，網頁開發主要都是透過 Javascript 直接操作 DOM，或者像 jquery 的 library 去操作。
- React 是透過 Virtual DOM(虛擬 DOM)進行操作，當某個 state 改變時，React 會去進行比對，並更改 DOM 的資料。並且 React 的資料流向是由上到下不可逆，這使得程式碼變得更有順序，錯誤時也會更容易找到錯誤的位置。以及使用 JSX 讓我們可以在 Javascript 裡面寫 HTML 標籤。
- 1. 決定 Components 要拆成多小
  2. 決定 state 的位置
  3. 當 state 改變時，哪些東西需要被改變
