import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderOpenRounded from '@material-ui/icons/FolderOpenRounded';
import DataUsageRounded from '@material-ui/icons/DataUsageRounded';
import QueueMusic from '@material-ui/icons/QueueMusic';
import MusicVideo from '@material-ui/icons/MusicVideo';
import Grid from '@material-ui/core/Grid';
import './HomePage.css'
import queue_music from './queue_music.svg';
import arrow_drop_down from './arrow_downward.svg'
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

const styles = {
    greenAvatar:{
        margin: 10,
        color: '#fff',
        backgroundColor: green[500]
    }
}

const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  };
  const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
  };
  const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
  };

class HomePage extends React.Component{
    constructor(){
        super();
        this.state = {
            uploadedFile: '',
            completed: 0,
            buffer: 10,
            isFileChose: false,
            files: []
        }
    }
    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed > 100) {
        this.setState({ completed: 0, buffer: 10 });
        } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        }
    }

    onDrop(files) {
        this.setState({files});
    }

    render(){
        const { classes } = this.props;
        const { completed, buffer, isFileChose } = this.state;
        
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ))
        return(
            <div className="big-box">
                <div className="top-box">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                    <Grid item>
                        <img src={queue_music} className="main-logo" alt="queue_music"/>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h2">
                            convert mp3 wav to piano music sheet
                        </Typography>

                    </Grid>
                    </Grid>
                </div>
                    
                <div className="middle-box">
                    {/* <Button variant="contained" >
                        <input ref={(ref) => {this.uploadInput = ref; }} type="file"/>
                    </Button> */}
                    {/* <label htmlFor="file-upload" className="label-file-upload">
                        <Button variant="contained" disabled size="large">
                            <Typography>Browse</Typography>
                            <FolderOpenRounded className="right-icon"></FolderOpenRounded>
                        </Button>
                    </label>
                    <input id="file-upload" type="file" onChange={(e)=>
                    this.handleChange(e.target.files)}/> */}
                    <Dropzone accept="audio/wav, audio/mp3"
                            onDrop={this.onDrop.bind(this)}>
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                            let styles = {...baseStyle}
                            styles = isDragActive ? {...styles, ...activeStyle} : styles
                            styles = isDragReject ? {...styles, ...rejectStyle} : styles

                            return (
                            <div
                                {...getRootProps()}
                                style={styles}
                            >
                                <input {...getInputProps()} />
                                <div>
                                {isDragAccept ? 'Drop' : 'Drag'} files here...
                                </div>
                                <p>Only *.wav and *.mp3 audios will be accepted</p>
                                <img src={arrow_drop_down} className="drop-logo" alt="arrow_drop_down"/>
                                {isDragReject && <div>Unsupported file type...</div>}
                            </div>
                            )
                        }}
                    </Dropzone>
                    <aside>
                        <h4>Files: </h4>
                        <ul>{files}</ul>
                    </aside>
                        {this.uploadInput != undefined && <Button variant="contained" className="button-sl-up">
                            <Typography> Upload </Typography>
                            <CloudUploadIcon className="right-icon"></CloudUploadIcon>
                        </Button>}
                        {/* <Button variant="contained" className="button-sl-up">
                            <Typography> Convert </Typography>
                            <DataUsageRounded className="right-icon"></DataUsageRounded>
                        </Button> */}
                    
                </div>
                <div className="progress-box">
                    <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer}/>
                </div>
                <Grid container justify="center" alignItems="center">
                    <Avatar className={classes.greenAvatar}>
                        <MusicVideo/>
                    </Avatar>
                    <Avatar className={classes.greenAvatar}>
                        <MusicVideo/>
                    </Avatar>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);