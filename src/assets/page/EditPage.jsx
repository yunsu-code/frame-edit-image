import { useRef, useState } from "react";
import frame from "../img/frame/test_frame.png";
import styled from "styled-components";
import styles from "./EditPage.module.scss";
import { useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const EditPage = () => {
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [objectFit, setObjectFit] = useState(false);
  const [afterObjectFitCLick, setAfterObjectFitCLick] = useState(false);
  const [imgScale, setImgScale] = useState(1);
  const [newObjectFitPosition, setNewObjectFitPosition] = useState({
    top: 0,
    left: 0,
  });
  const [imgPosition, setImgPosition] = useState({
    top: 0,
    left: 0,
  });

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const delImgFile = () => {
    if (imgRef.current.files.length > 0) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile("");
      };
    }
  };

  const onDownloadBtn = () => {
    domtoimage
      .toBlob(document.querySelector(`.${styles.editFrame}`))
      .then((blob) => {
        saveAs(blob, "editFrame.png");
      });
  };

  useEffect(() => {
    setImgPosition({ top: 0, left: 0 });
    setImgScale(1);
    setNewObjectFitPosition({ top: 0, left: 0 });
    setAfterObjectFitCLick(false);
    setObjectFit(false);
  }, [imgFile]);

  return (
    <>
      <div className={styles.editFrameWrap}>
        <div className={styles.editFrameContainer}>
          <div className={styles.editFrame}>
            <img className={styles.frame} src={frame} />
            <StyledUserImg
              className={styles.userImg}
              src={imgFile}
              $objectFit={objectFit}
              $imgPosition={imgPosition}
              $imgScale={imgScale}
              $afterObjectFitCLick={afterObjectFitCLick}
              $newObjectFitPosition={newObjectFitPosition}
            />
          </div>
          <button
            className={`${styles.scaleButton} ${styles.symbol} ${styles.top}`}
            onClick={() => {
              setImgPosition({
                ...imgPosition,
                top: imgPosition.top - 3,
              });
              setNewObjectFitPosition({
                ...newObjectFitPosition,
                top: newObjectFitPosition.top - 3,
              });
              setAfterObjectFitCLick(objectFit && true);
            }}
          >
            ↑
          </button>
          <button
            className={`${styles.scaleButton} ${styles.symbol} ${styles.bottom}`}
            onClick={() => {
              setImgPosition({
                ...imgPosition,
                top: imgPosition.top + 3,
              });
              setNewObjectFitPosition({
                ...newObjectFitPosition,
                top: newObjectFitPosition.top + 3,
              });
              setAfterObjectFitCLick(objectFit && true);
            }}
          >
            ↓
          </button>
          <button
            className={`${styles.scaleButton} ${styles.symbol} ${styles.left}`}
            onClick={() => {
              setImgPosition({
                ...imgPosition,
                left: imgPosition.left - 3,
              });
              setNewObjectFitPosition({
                ...newObjectFitPosition,
                left: newObjectFitPosition.left - 3,
              });
              setAfterObjectFitCLick(objectFit && true);
            }}
          >
            ←
          </button>
          <button
            className={`${styles.scaleButton} ${styles.symbol} ${styles.right}`}
            onClick={() => {
              setImgPosition({
                ...imgPosition,
                left: imgPosition.left + 3,
              });
              setNewObjectFitPosition({
                ...newObjectFitPosition,
                left: newObjectFitPosition.left + 3,
              });
              setAfterObjectFitCLick(objectFit && true);
            }}
          >
            →
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`${styles.scaleButton} ${objectFit && styles.active}`}
            onClick={() => {
              setObjectFit(!objectFit);
              setAfterObjectFitCLick(false);
              setNewObjectFitPosition(
                objectFit === false && { top: 0, left: 0 }
              );
            }}
          >
            Auto
          </button>
          <button
            type="button"
            className={`${styles.scaleButton}`}
            onClick={() => {
              setImgPosition({ top: 0, left: 0 });
              setImgScale(1);
              setNewObjectFitPosition({ top: 0, left: 0 });
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className={`${styles.scaleButton}`}
            onClick={() => setImgScale(imgScale + 0.04)}
          >
            Zoom In
          </button>
          <button
            type="button"
            className={`${styles.scaleButton}`}
            onClick={() => setImgScale(imgScale - 0.04)}
          >
            Zoom Out
          </button>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            className={styles.uploadInput}
            onChange={saveImgFile}
            ref={imgRef}
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => {
              delImgFile();
              setImgPosition({ top: 0, left: 0 });
              setImgScale(1);
              setNewObjectFitPosition({ top: 0, left: 0 });
              setAfterObjectFitCLick(false);
              setObjectFit(false);
            }}
          >
            이미지 삭제하기
          </button>
          <button className="downBtn" onClick={onDownloadBtn}>
            다운로드 버튼
          </button>
        </div>
      </div>
    </>
  );
};

const StyledUserImg = styled.img`
  ${(props) =>
    props.$objectFit
      ? `object-fit: cover; width: 100%; top: 0px; left: 0px; transform: scale(1);`
      : "object-fit: contain;"}
  top: ${(props) =>
    props.$objectFit && !props.$afterObjectFitCLick
      ? 0
      : props.$objectFit && props.$afterObjectFitCLick
      ? `${props.$newObjectFitPosition.top}px`
      : `${props.$imgPosition.top}px`};
  left: ${(props) =>
    props.$objectFit && !props.$afterObjectFitCLick
      ? 0
      : props.$objectFit && props.$afterObjectFitCLick
      ? `${props.$newObjectFitPosition.left}px`
      : `${props.$imgPosition.left}px`};
  transform: scale(${(props) => props.$imgScale});
`;

export default EditPage;
