import { faAngleRight, faGear, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet } from "react-native";
import { Pressable, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { USER_LOG_OUT } from "../../redux/action";

export default function ProfileOptions() {
	const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(USER_LOG_OUT);
  }
	return (
		<View style={styles.container}>
			<ScrollView>
				<Pressable style={styles.option}>
					<View style={styles.contentView}>
						<FontAwesomeIcon icon={faGear} />
						<Text style={styles.text}>Settings</Text>
						<FontAwesomeIcon icon={faAngleRight} />
					</View>
				</Pressable>
				<Pressable style={styles.option}>
					<View style={styles.contentView}>
						<FontAwesomeIcon icon={faUser} />
						<Text style={styles.text}>User Mangagement</Text>
						<FontAwesomeIcon icon={faAngleRight} />
					</View>
				</Pressable>
				<Pressable style={styles.option} onPress={handleLogOut}>
					<View style={styles.contentView}>
						<FontAwesomeIcon icon={faRightFromBracket} />
						<Text style={styles.text}>Log out</Text>
						<View></View>
					</View>
				</Pressable>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
		paddingTop: 25,
		flex: 1,
		padding: 10,
		backgroundColor:'white',
		borderRadius: 50,
	},
	option: {
		marginVertical: 5,
		backgroundColor:'#ffebcd',
		width: '100%',
		height: 60,
		paddingHorizontal: 15,
		borderRadius: 20
	},
	contentView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontSize: 15,
		color: 'black',
		fontWeight: '400',
	}
})