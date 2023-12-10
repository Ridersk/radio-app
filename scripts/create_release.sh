TAG_NAME="1.0.0"

gh release create $TAG_NAME --title "Release $TAG_NAME"
gh release upload $TAG_NAME "./android/build/radio_app-v1_0_0.zip"
