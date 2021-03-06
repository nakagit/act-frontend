import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  inner: {
    marginTop: 80,
    [theme.breakpoints.down('md')]: {
      marginTop: 80
    }
  },
  logo: {
    width: 512
  },
  list: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3
  },
  text: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    // color: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.dark
    },
    '&:focus,&:active': {
      color: theme.palette.secondary.light
    }
  }
});
const GraphEmptyComp = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.inner}>
      <img
        className={classes.logo}
        src='/act-logo-onWhite.svg'
        alt='ACT | The Open Threat Intelligence Platform'
      />
      <Typography className={classes.text}>
        Use the left menu to search for objects.
        <br />
        To get started try out one of these examples
        <ul className={classes.list}>
          <li>
            <a
              className={classes.link}
              href='/object-fact-query/ipv4/153.148.23.118'
            >
              /object-fact-query/ipv4/153.148.23.118
            </a>
          </li>
          <li>
            <a
              className={classes.link}
              href='/object-fact-query/threatActor/Sofacy'
            >
              /object-fact-query/threatActor/Sofacy
            </a>
          </li>
          <li>
            <a
              className={classes.link}
              href='/object-fact-query/technique/Credential%20Dumping'
            >
              /object-fact-query/technique/Credential%20Dumping
            </a>
          </li>
          <li>
            <a className={classes.link} href='/object-fact-query/tool/foosace'>
              /object-fact-query/tool/foosace
            </a>
          </li>
          <li>
            <a
              className={classes.link}
              href='/object-fact-query/hash/da2a657dc69d7320f2ffc87013f257ad'
            >
              /object-fact-query/hash/da2a657dc69d7320f2ffc87013f257ad
            </a>
          </li>
        </ul>
        <Button variant='outlined' component='a' href='/examples'>
          Click here for a full list of examples
        </Button>
      </Typography>
    </div>
  </div>
);

export default withStyles(styles)(GraphEmptyComp);
