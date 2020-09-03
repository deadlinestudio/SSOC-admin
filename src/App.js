import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));   

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>      
            <Switch>
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />   
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

/*
lazy : 동적 가져 오기를 사용하여 컴포넌트 수준에서 React 애플리케이션을 쉽게 코드 분할 
Suspense fallback : React 컴포넌트를 로딩 상태로 표시 할 수 있는 컴포넌트를 받습니다
Route render : render를 사용하면 불필요하게 컴포넌트가 재마운트되지 않는다.
*/