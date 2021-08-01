import React, {Component} from 'react';
import axios from 'axios';
import ImageResults from "../imageResults/imageResults";

class Search extends Component{
    state={
        searchText:'',
        apiUrl: 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent',
        apiKey: '5589b0662f950d3f2a3e599449861e10',
        secret: '659ee19b9d76d07c',
        images:[]
    };
    
    onTextChange=e=>{
        const val = e.target.value;
        this.setState({[e.target.name]:val} ,()=>{
            if(val === ''){
                //if input value is blank then call 'getRecent' api and get random images
                axios
                .get(
                    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${this.state.apiKey}&format=json&nojsoncallback=1`
                ).then(res=>this.setState({images: res.data.photos.photo}))
                .catch(err=>console.log(err));  // error handling while getting response from API
            }else{
                // if input value is some query then call 'search' api and get images based on that query
                axios
                .get(
                    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&tags=${this.state.searchText}&format=json&nojsoncallback=1`
                ).then(res=>this.setState({images: res.data.photos.photo}))
                .catch(err=>console.log(err)); //error handling while getting response from API
            }          
        });
    };
    render(){
        console.log(this.state.images);
        return(
            <div>
                <div className="header" style={{position:'sticky', zIndex:1, top:0, backgroundColor: 'black', paddingBottom:20}}>
                    <h2 style={{textAlign:'center', color:'white'}}>
                    ClassPlus-Search Photos
                    </h2>
                    <input className="input" type="text"   // input text field
                    style=
                    {{
                        backgroundColor: 'white',
                        marginLeft: 50,
                        padding: 8,
                        width:'90%',
                        fontSize: 20,
                        borderRadius: 10,
                        outline:'none',
                        borderBottomStyle: "groove" 
                    }}
                    placeholder="Search for images"
                    name="searchText" 
                    value={this.state.searchText}
                    onChange={this.onTextChange}   // on typing call function to call api and get data
                    />
                </div>
                
                <br/>
                <div>    
                {this.state.images.length>0 ? (<ImageResults images={this.state.images}/>) : null} 
                </div>
            </div>
        )
    }
} 

export default Search;