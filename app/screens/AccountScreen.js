import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../config/AppText";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Colours from "../config/Colours";
import useAuth from "../auth/useAuth";
import { getProfilePicture } from "../api/users";
import ImageInput from "../components/ImageInput";
import DropDown from "../components/DropDown";
import DisplayImage from "../components/DisplayImage";
import { getHouseholdCode } from "../api/household";
import { object } from "yup";

function AccountScreen({ navigation }) {
  const { household, img, logOut, user } = useAuth();

  const [show, setShow] = useState(false);
  const [key, setKey] = useState();

  const showKey = async () => {
    if (!show) {
      const { data } = await getHouseholdCode();
      setKey(data.code);
    }
    setShow(!show);
  };

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Account
        </AppText>
      </View>
      <Screen>
        <View style={styles.container}>
          <DropDown
            placeHolder={
              <ListItem
                disabled={true}
                title={user.name}
                titleStyle={{
                  fontWeight: "700",
                  color: Colours.white,
                }}
                subTitle={user.email}
                subTitleStyle={{
                  color: Colours.lightgray,
                }}
                JSXImage={
                  <DisplayImage
                    img={img[user._id]}
                    imageStyle={{
                      borderColor: Colours.lightgray,
                      borderWidth: 1,
                    }}
                  />
                }
                containerstyles={{ backgroundColor: Colours.secondary }}
              />
            }
          >
            <ListItem
              title="Profile Picture"
              titleStyle={{
                fontWeight: "600",
              }}
              IconComponent={
                <MaterialCommunityIcons name="camera" size={40} color="black" />
              }
              onPress={() => navigation.navigate("Profile_Picture")}
            />
            <ListItem
              title="LOGOUT"
              titleStyle={{
                fontWeight: "600",
              }}
              IconComponent={
                <MaterialCommunityIcons name="logout" size={40} color="black" />
              }
              onPress={() => logOut()}
              // Create Nav for each screen
            />
          </DropDown>

          <DropDown
            placeHolder={
              <ListItem
                disabled={true}
                title="Household"
                titleStyle={{
                  fontWeight: "700",
                  color: Colours.black,
                }}
                subTitle={household.name}
                subTitleStyle={{
                  color: Colours.black,
                }}
                containerstyles={{
                  backgroundColor: Colours.titleCardGray,
                }}
                IconComponent={
                  <MaterialCommunityIcons
                    name="home"
                    size={55}
                    color={Colours.black}
                  />
                }
              />
            }
          >
            <DropDown
              placeHolder={
                <ListItem
                  title="Joining Code"
                  titleStyle={{
                    fontWeight: "600",
                  }}
                  IconComponent={
                    <MaterialCommunityIcons
                      name="key"
                      size={35}
                      color="black"
                    />
                  }
                  disabled
                />
              }
            >
              <ListItem
                title="Reveal household linking code"
                titleStyle={{
                  fontWeight: "500",
                  fontSize: 16,
                }}
                subTitle={show && key}
                subTitleStyle={{
                  fontWeight: "300",
                  fontSize: 14,
                }}
                containerstyles={{
                  backgroundColor: Colours.titleCardGray,
                }}
                IconComponent={
                  <MaterialCommunityIcons name="lock" size={25} color="black" />
                }
                onPress={() => showKey()}
              />
              <ListItem
                title="SMS household linking code"
                titleStyle={{
                  fontWeight: "500",
                  fontSize: 16,
                }}
                containerstyles={{
                  backgroundColor: Colours.titleCardGray,
                }}
                IconComponent={
                  <MaterialCommunityIcons
                    name="message"
                    size={25}
                    color="black"
                  />
                }
                onPress={() => navigation.navigate("Profile_Picture")}
              />
            </DropDown>

            <DropDown
              placeHolder={
                <ListItem
                  title="Users in Household"
                  subTitle="(Coming Soon)"
                  titleStyle={{
                    fontWeight: "600",
                  }}
                  IconComponent={
                    <MaterialCommunityIcons
                      name="face"
                      size={35}
                      color="black"
                    />
                  }
                  disabled
                />
              }
            >
              <FlatList
                data={household.users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.name}
                    JSXImage={<DisplayImage img={img[item._id]} />}
                  />
                )}
              />
            </DropDown>
          </DropDown>
          <ListItem
            title="Subscription"
            titleStyle={{
              fontWeight: "600",
            }}
            containerstyles={{ backgroundColor: "#ffc60a" }}
            IconComponent={<MaterialCommunityIcons name="key" size={40} />}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.lightgray,
    borderRadius: 20,
  },
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default AccountScreen;
