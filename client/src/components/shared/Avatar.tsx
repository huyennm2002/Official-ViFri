import { useSelector } from "react-redux"
import { Image, StyleSheet } from "react-native"
import { RootState } from "../../redux/store"

const Avatar = (props) => {
  const { id, avatar }= useSelector((state: RootState) => state.user.info)
  const { customStyle } = props;
  return (
    <Image
      style={customStyle ? customStyle : styles.avatarImage}
      source={{
        uri: `https://d31nw62mg4zmmx.cloudfront.net/avatar_${id}.jpg?v=${avatar}`,
      }}
    />
  )
}
const styles = StyleSheet.create({
  avatarImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
})
Avatar.defaultProps = {
  customStyle: styles.avatarImage
}

export default Avatar;