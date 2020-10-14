import React from "react";
import { Card, CardHeader, CardActions, CardContent } from "@material-ui/core";

const style = {
  AccordionActions: {
    justifyContent: "flex-end",
    padding: "16px",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    background: "#f3f3f3",
  },
};

function ProfileCard({ title, children, actions, onlyView }) {
  return (
    <Card variant="outlined" style={{ width: "100%" }}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      {!onlyView && (
        <CardActions style={style.AccordionActions}>{actions}</CardActions>
      )}
    </Card>
  );
}

export default ProfileCard;
