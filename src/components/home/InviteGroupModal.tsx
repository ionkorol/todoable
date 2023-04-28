import { Feather } from "@expo/vector-icons";
import {
  Input,
  Alert,
  HStack,
  IconButton,
  Icon,
  VStack,
  Slide,
  Box,
  Heading,
  Button,
} from "native-base";
import React, { useState } from "react";
import { Share } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import * as Clipboard from "expo-clipboard";
import { modalInviteGroupShow } from "redux-store/slices/modals";
import { FlingGestureHandler, Directions } from "react-native-gesture-handler";

const InviteGroupModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const show = useSelector((state: RootState) => state.modals.inviteGroup);
  const { group } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const onClose = () => dispatch(modalInviteGroupShow(false));

  const onShare = async () => {
    setLoading(true);
    try {
      await Share.share({
        message: `Please join my group in the Our TODO app. Here is the invite code: ${group!}`,
      });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Slide in={show} placement="bottom">
      <FlingGestureHandler direction={Directions.DOWN} onActivated={onClose}>
        <Box backgroundColor="white" p={5} shadow={5}>
          <VStack space={5}>
            <HStack justifyContent="space-between">
              <Heading>Invite Member</Heading>
              <IconButton
                variant="ghost"
                icon={<Icon as={Feather} name="x" size="sm" />}
                onPress={onClose}
              />
            </HStack>
            {copied && (
              <Alert status="info">
                <Alert.Icon />
                <Alert.Title>Copied</Alert.Title>
              </Alert>
            )}
            <Input
              value={group!}
              isReadOnly
              fontWeight="bold"
              onTouchMove={() => {
                setCopied(true);
                Clipboard.setString(group!);
              }}
              flex={1}
            />
            <Button
              startIcon={<Icon as={Feather} name="share" size="sm" />}
              onPress={onShare}
              isLoading={loading}
            >
              Share
            </Button>
          </VStack>
        </Box>
      </FlingGestureHandler>
    </Slide>
  );
};

export default InviteGroupModal;
