import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import FileThumb from '../FileThumb'
import { withFirebase } from '../Firebase';
import FileDetails from '../FileDetails';


const manager = withFirebase(class Manager extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            item: null
        }
    }

    getItemDetails(item) {
        return new Promise(async (resolve, reject) => {
            const itemDownloadURL = await item.getDownloadURL()
            const itemMetadata = await item.getMetadata()

            resolve({
                name: item.name,
                url: itemDownloadURL,
                metadata: itemMetadata
            })
        })
    }

    async getItemsDetails(itemsList) {
        const list = await itemsList.listAll()

        const promises = []
        list.items.forEach(i => promises.push(this.getItemDetails(i)))

        const items = await Promise.all(promises)

        this.setState({ items })
    }

    componentWillMount() {
        const storage = this.props.firebase.storage
        const storageRef = storage.ref();

        const listRef = storageRef.root.child('images');
        this.getItemsDetails(listRef)
    }
    uploadFile(event) {
        const storage = this.props.firebase.storage
        const storageRef = storage.ref();
        
        const file = event.target.files[0]
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused': // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running': // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
    }

    selectItem(item) {
        this.setState({ item })
    }
    render() {
        const item = this.state.item
        const details = item ? <FileDetails item={item} /> : null
        const thumbs = this.state.items.map(item => <div style={{ display: 'inline-block', marginRight: '0.5rem' }} item onClick={function () { this.selectItem(item) }.bind(this)}>
            <FileThumb item={item} />
        </div>)
        return (
            // Two sections

            <div style={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {/* Files */}
                    <Grid item container xs={6} spacing={1}>
                        <div>
                            {thumbs}
                            <input type="file" style={{
                                verticalAlign: 'top',
                                textAlign: 'center',
                                fontSize: '0.3rem',
                                boxSizing: 'border-box', border: '2px dotted #999', cursor: 'pointer', height: '3rem', width: '3rem', display: 'inline-block', marginRight: '0.5rem'
                            }} item onChange={this.uploadFile.bind(this)} />
                        </div>

                    </Grid>
                    {/* Details */}
                    <Grid item xs={6}>
                        {details}
                    </Grid>
                </Grid>
            </div>

        )

    }
})

export default manager;