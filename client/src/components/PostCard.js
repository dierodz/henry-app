import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useQuery } from "@apollo/client";
import { USER_FULL } from "apollo/querys/users";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    margin: 7
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({ id, tittle, content, userId }) {
  const classes = useStyles();
  const { data: preData } = useQuery(USER_FULL, { variables: { id: userId } });

  const user = useMemo(() => {
    if (preData) {
      return preData.users[0];
    }
  }, [preData]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user && user.photoUrl ? (
              <img
                src={user && user.photoUrl && user.photoUrl}
                style={{ width: "100%", borderRadius: "50%" }}
                alt={tittle}
              />
            ) : (
              <h5> {user && user.givenName[0].toUpperCase()} </h5>
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user && user.givenName}
        subheader={tittle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
