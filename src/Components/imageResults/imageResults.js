import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

//used material UI for displaying images

class ImageResults extends Component{
    state={
        open: false,
        currentImg: '',
    }
    // function to open modal
    handleOpen=img=>{
        this.setState({open:true,currentImg:img})
    }
    // function to close modal
    handleClose=()=>{
        this.setState({open:false})
    }
    render(){ 
        let imageList ;
        const {images} = this.props;

        if(images){
            imageList=(
                <GridList cols={4}>
                {   //loop over images
                    images.map(img=>(
                        
                        <GridTile 
                        title={img.title}
                        key={img.id}
                        actionIcon={   // on clicking icon button modal will open containig that particular photo 
                            <IconButton onClick={()=>{this.handleOpen(`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`)}}>
                                <ZoomIn color="white" />
                            </IconButton>
                        }
                        >
                        <img src={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`} alt=""/>
                        </GridTile>
                    ))
                }   
                </GridList>
            )
        }else{
            imageList=null;
        }
        const action=[ // close button for modal 
            <FlatButton label="Close" primary={true} onClick={this.handleClose}/>
        ]
        return(  // return list of images displayed
            <div style={{marginLeft:50,marginRight:50, marginTop:20}}>
                {imageList}
                <Dialog 
                actions={action}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <img src={this.state.currentImg} alt="" style={{width:'100%'}}/>
                </Dialog>
            </div>
        ); 
    }
}
// prop-types -> verifies the typechecking of images we get
ImageResults.propTypes={
    images:PropTypes.array.isRequired
}

export default ImageResults;