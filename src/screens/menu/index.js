import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Navigator from "../../components/BreadCrumb";
import { useSelector } from "react-redux";
import Card from "../../components/Card";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "70px",
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  menuImage: {
    height: "40px",
    width: "40px",
    [theme.breakpoints.up("sm")]: {
      height: "70px",
      width: "70px",
    },
  },
  cardContainer: {
    margin: "0 8px 0 0",
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const { category, categoryImage, currentElement, handleClick, index } = props;
  //console.log(currentElement);
  return (
    <div
      className={classes.menuContainer}
      style={
        currentElement === category
          ? { borderBottom: "5px solid orange" }
          : { borderBottom: "5px solid transparent" }
      }
      onClick={() => handleClick(index)}
    >
      <div>
        <img
          src={categoryImage}
          alt={`${category}_photo`}
          height={"auto"}
          width={"auto"}
          className={classes.menuImage}
        />
      </div>
      <div>{category}</div>
    </div>
  );
};

export default function Menu() {
  const classes = useStyles();

  //const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showCategory, setShowCategory] = React.useState(null);

  React.useEffect(() => {
    setSelectedCategory(products[0]?.data.category);
    setShowCategory(products[0]);
  }, [products]);

  const handleClick = (index) => {
    setSelectedCategory(products[index].data.category);
    setShowCategory(products[index]);
  };

  return (
    <div className={classes.screenContainer}>
      <Container maxWidth={"lg"}>
        <Navigator currentLink={"Menu"} />
        <Grid container>
          <Grid item container xs={12}>
            {products?.map((product, index) => {
              //console.log(selectedCategory);
              return (
                <Grid
                  item
                  xs={3}
                  md={2}
                  key={product.data.category}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <MenuItem
                    category={product.data.category}
                    categoryImage={product.data.categoryImage}
                    handleClick={handleClick}
                    index={index}
                    currentElement={selectedCategory}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container xs={12}>
            {selectedCategory !== "Burgers" && selectedCategory !== "Pizza" ? (
              showCategory?.data?.products?.map((product, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    key={product?.itemName}
                    className={classes.cardContainer}
                  >
                    <Card
                      name={product?.itemName}
                      photo={product?.itemPhoto}
                      price={product?.itemPrice}
                    />
                  </Grid>
                );
              })
            ) : (
              <>
                {showCategory?.data?.products?.veg?.map((product, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      key={product?.itemName}
                      className={classes.cardContainer}
                    >
                      <Card
                        name={product?.itemName}
                        photo={product?.itemPhoto}
                        price={product?.itemPrice}
                        type={{
                          name: "Veg",
                          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/120px-Veg_symbol.svg.png",
                        }}
                      />
                    </Grid>
                  );
                })}
                {showCategory?.data?.products?.nonVeg?.map((product, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      key={product?.itemName}
                      className={classes.cardContainer}
                    >
                      <Card
                        name={product?.itemName}
                        photo={product?.itemPhoto}
                        price={product?.itemPrice}
                        type={{
                          name: "Non-Veg",
                          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png",
                        }}
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
