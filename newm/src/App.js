import React from 'react';
import Menu0 from './Menu0';
import H from './H';
import Home from './Home'
import Bisection from './Root of Equation/Bisection'
import FalsePosition from './Root of Equation/FalsePosition'
import NewtonRaphson from './Root of Equation/NewtonRaphson'
import Secant from './Root of Equation/Secant'
import Onepoint from './Root of Equation/Onepoint'
import Taylor from './Root of Equation/Taylor'
import Graphical from './Root of Equation/Graphical'
import Compositetrapzoidal from './Integration/Compositetrapzoidal'
import {
  BrowserRouter as Router,
  Route,
  //Redirect

} from 'react-router-dom';

import Cramer from './Linear Algebra/Cramer'
import LU from './Linear Algebra/LU'
import Gauss from './Linear Algebra/Gauss'
import Jordan from './Linear Algebra/Jordan'
import Cholesky from './Linear Algebra/Cholesky'
import Backwardh from './Differentiation/Backwardh'
import Backwardh2 from './Differentiation/Backwardh2'
import Centralh2 from './Differentiation/Centralh2'
import Centralh4 from './Differentiation/Centralh4'
import Forwardh from './Differentiation/Forwardh'
import Forwardh2 from './Differentiation/Forwardh2'



function App() {

  return (
    <div><H />
   
      <Router>
        <Menu0 />
        
        <Route path="/" component={Home} exact />
        <Route path="/Bisection" component={Bisection} exact />
        <Route path="/NewtonRaphson" component={NewtonRaphson} exact />
        <Route path="/Secant" component={Secant} exact />
        <Route path="/Taylor" component={Taylor} exact />
        <Route path="/FalsePosition" component={FalsePosition} exact />
        <Route path="/Onepoint" component={Onepoint} exact />
        <Route path="/Cramer" component={Cramer} exact />
        <Route path="/LU" component={LU} exact />
        <Route path="/Gauss" component={Gauss} exact />
        <Route path="/Jordan" component={Jordan} exact />
        <Route path="/Graphical" component={Graphical} exact />
        <Route path="/Cholesky" component={Cholesky} exact />

        
        <Route path="/CompositeTrapzoidal" component={Compositetrapzoidal} exact />

        <Route path="/Backwardh" component={Backwardh} exact />
        <Route path="/Backwardh2" component={Backwardh2} exact />
        <Route path="/Centralh2" component={Centralh2} exact />
        <Route path="/Centralh4" component={Centralh4} exact />
        <Route path="/Forwardh" component={Forwardh} exact />
        <Route path="/Forwardh2" component={Forwardh2} exact />
        

      </Router>
    </div>
  );
}
export default App;