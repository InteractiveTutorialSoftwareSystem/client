import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui/material components
import { makeStyles, withStyles } from "@mui/styles";
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
// @mui/icons-material
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/allTutorialsPage.js";

import image from "assets/img/profile-bg.jpg";

const useStyles = makeStyles(styles);

export default function AllTutorialsPage(props) {
  const classes = useStyles();
  const ListItem = withStyles({
    root: {
      "&$selected, &$selected:hover": {
        backgroundColor: "grey",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      }
    },
    selected: {}
  })(MuiListItem);

  const TutorialCard = ({id, language, name, sequence, user_name, user_picture, last_page}) => {
    let lessonNoun = "lessons";
    if (sequence === 1) {
      lessonNoun = "lesson";
    }
    let page;
    const normalizedLastPage = last_page > sequence ? sequence : last_page;
    page = normalizedLastPage === 0 ? 1 : normalizedLastPage;
    let redirectUrl = "/tutorial/" + id + "/" + page
    if (props.role == "author") {
      redirectUrl = "/tutorial/overview/" + id
    }

    return (
      <GridItem xs={12} sm={6} md={4} lg={3}>
        <a href={redirectUrl}>
          <Card className={classes.card}>
            <CardBody>
              <h4>{name}</h4>
              {props.role == "learner" ? <p>{language} | {sequence} {lessonNoun} | {Math.round(last_page/sequence*100)}% Completed</p>:
              <p>{language} | {sequence} {lessonNoun}</p>}
              <div className={classes.avatarDiv}>
                <Avatar src={user_picture}>{user_name[0]}</Avatar> <span className={classes.authorNameSpan}>{user_name}</span>
              </div>
            </CardBody>
          </Card>
        </a>
      </GridItem>
    );
  };
  
  const { ...rest } = props;

  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(["python", "java", "javascript"]);
  const [openLanguage, setOpenLanguage] = useState(true);

  const [createTutorialButton, setCreateTutorialButton] = useState(false);

  const [tutorials, setTutorials] = useState([]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    switch(index) {
      case 0:
        setSelectedLanguage(["python", "java", "javascript"]);
        break;
      case 1:
        setSelectedLanguage(["python"]);
        break;
      case 2:
        setSelectedLanguage(["java"]);
        break;
      case 3:
        setSelectedLanguage(["javascript"]);
        break;
    }
  };

  const handleLanguageClick = () => {
    setOpenLanguage(!openLanguage);
  };

  const handleCreateButton = () => {
    navigate("/tutorial/create")
  }

  useEffect(() => {
    if (props.role == "author") {
      const authorRequestOptions = {
        method: 'GET',
      };
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorials/get/' + props.userId, authorRequestOptions).then(response => {
        return response.json();
      }).then(response => {
        setTutorials(response.tutorials);
        setCreateTutorialButton(true);
      });
    } else if (props.role == "learner") {
      const learnerRequestOptions = {
        method: 'GET',
      };
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorials/get_all/' + props.userId, learnerRequestOptions).then(response => {
        return response.json();
      }).then(response => {
        setTutorials(response.tutorials); 
      });
    }
  }, []);
    

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Interactive Tutorial System"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer className={classes.mainContainer}>

            {/* Left Panel */}
            <GridItem xs={12} sm={3} lg={2}>
              <List component="nav">
                <ListItem 
                  button
                  selected={selectedIndex === 0}
                  onClick={() => handleListItemClick(0)}
                >
                  <ListItemText primary="All" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={handleLanguageClick}
                >
                  <ListItemText primary="Languages" />
                  {openLanguage ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openLanguage} timeout="auto" unmountOnExit>
                  <List dense component="div" disablePadding>
                    <ListItem 
                      button 
                      className={classes.nested}
                      selected={selectedIndex === 1}
                      onClick={() => handleListItemClick(1)}
                    >
                      <ListItemText primary="Python" />
                    </ListItem>
                    <ListItem 
                      button 
                      className={classes.nested}
                      selected={selectedIndex === 2}
                      onClick={() => handleListItemClick(2)}
                    >
                      <ListItemText primary="Java" />
                    </ListItem>
                    <ListItem 
                      button 
                      className={classes.nested}
                      selected={selectedIndex === 3}
                      onClick={() => handleListItemClick(3)}
                    >
                      <ListItemText primary="Javascript" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </GridItem>

            {/* Right Panel */}
            <GridItem xs={12} sm={9} lg={10}>
              {createTutorialButton
                ? (
                  <div className={classes.createTutorialButton} style={{display: createTutorialButton}}>
                    <Button color="primary" onClick={handleCreateButton}>
                      Create Tutorial
                    </Button>
                  </div>
                )
                : null
              }
              {tutorials
                ? (
                  <GridContainer>
                    {tutorials
                      .filter(tutorial => selectedLanguage.includes(tutorial.language))
                      .map((tutorial) => {
                        return <TutorialCard key={tutorial.id} {...tutorial}/>
                    })}
                  </GridContainer>
                ) : (
                    <p>There is no tutorial yet</p>
                )
              }
            </GridItem>

          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
