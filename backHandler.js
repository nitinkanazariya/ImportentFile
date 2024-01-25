const closeModal = () => {
  setCoverImg(false);
  setViewImage(false);
};
// modal ma onrequestClose ni under close modal aapva nu
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    closeModal
  );

  return () => backHandler.remove();
}, [coverImg, viewImage]);
