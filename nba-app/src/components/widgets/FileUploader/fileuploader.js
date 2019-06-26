import React, {Component} from 'react';
import {firebase} from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {
    state = {
        name: '', // file name
        isUploading: false,
        progress: 0,
        fileURL: ''
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true,
            progress: 0
        })
    }

    handleUploadError = (error) => {
        this.setState({
            isUploading: false
            
        })
        console.log(error)
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress
        })
    }

    handleUploadSuccess = (filename) => {
        console.log(filename);
        this.setState({
            name: filename,
            progress: 100,
            isUploading: false
        })

        // Setting up the firebase to find the child links into the storage and to show an image into the uploader

        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({fileURL: url})
        })

        this.props.filename(filename)
    }


    render(){
        return (
            <div>
                <FileUploader 
                    accept="image/*" // Accepts all types of images
                    name="image"
                    randomizeFilename // Randomizes the filename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
                {this.state.isUploading ? 
                    <p>Progress: {this.state.progress}</p>
                    : null
                }
                {this.state.fileURL ?
                <img style={{width: '300px'}} src={this.state.fileURL} alt=""/>
                :
                null
                }
            </div>
        )
    }
}

export default Uploader;