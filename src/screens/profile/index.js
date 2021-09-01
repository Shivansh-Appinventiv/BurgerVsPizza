import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import Input from "../../components/Controls/Input";
import OButton from "../../components/Controls/Button/outlinedButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import EditIcon from "@material-ui/icons/Edit";
import Schema from "../../schema";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/loginSignUpSlice";
import { auth } from "../../authentication/firebase";
import { addUserInfo } from "../../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px",
  },
  profileTitle: {
    fontSize: "20px",
    fontFamily: `"Acme",sans-serif`,
    margin: "20px 0 10px 0",
  },
}));

export default function Profile() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSignUp);

  const [disabled, setDisabled] = React.useState(true);

  const { userInfo } = useSelector((state) => state.user);

  const onSubmit = (values) => {
    console.log(values);
    dispatch(addUserInfo({ values, user }));
    setDisabled(true);
  };

  // React.useEffect(() => {
  //   if (JSON.stringify(userInfo) === "{}") {
  //     setDisabled(false);
  //   }
  // }, [userInfo]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  const savedValues = {
    ...userInfo,
  };

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch(userLogout());
  };

  return (
    <div className={classes.screenContainer}>
      <Container maxWidth={"lg"}>
        <div>
          <div>
            {savedValues && (
              <Formik
                initialValues={savedValues || initialValues}
                validationSchema={Schema.ProfileSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                <Form autoComplete={"off"}>
                  <Grid container>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6} className={classes.profileTitle}>
                        {"User Information"}
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={classes.profileTitle}
                        style={{ textAlign: "right" }}
                      >
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={handleEdit}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          disabled={disabled}
                          name={"firstName"}
                          label={"FirstName"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          disabled={disabled}
                          name={"lastName"}
                          label={"LastName"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          disabled={disabled}
                          name={"email"}
                          label={"Email"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          disabled={disabled}
                          name={"phoneNo"}
                          label={"Phone Number"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={12} className={classes.profileTitle}>
                        {"Address Information"}
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          disabled={disabled}
                          name={"address"}
                          label={"Address"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Input
                          disabled={disabled}
                          name={"city"}
                          label={"City"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Input
                          disabled={disabled}
                          name={"state"}
                          label={"State"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Input
                          disabled={disabled}
                          name={"zip"}
                          label={"ZipCode"}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    {!disabled && (
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12}>
                          <OButton type={"submit"} fullWidth>
                            {"Save"}
                          </OButton>
                        </Grid>
                      </Grid>
                    )}
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={12}>
                        <OButton
                          endIcon={<PowerSettingsNewIcon />}
                          onClick={handleLogout}
                        >
                          {"Logout"}
                        </OButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
