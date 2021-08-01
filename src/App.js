import React,{Component} from 'react';
import Search from "./Components/Search/search";
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//MuiThemeProvider helps to use all the functionality of material UI
class App extends Component{
  render(){
    return (
      <MuiThemeProvider>
      <div >
          <Search/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
