import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Typewriter from "typewriter-effect";
import { useAppSelector } from "../../../hooks/redux";
import { RiStackshareLine } from "react-icons/ri";
import { Tooltip } from "../ui/tooltip";

function Hero() {
    const task = useAppSelector(state => state.task);
    const [topTask, setTopTask] = React.useState("What is the top task? 😙");
    React.useEffect(() => {
        if(task && Array.isArray(task) && task.length > 0) {
            setTopTask(task[0].title);
        }
    },[task])

    const handleClick = () => {
    (window as any).taskAPI.toggleAlwaysOnTop();
  };

    return (
        <Box>
            <Tooltip content="Toggle Always-on-Top">
                <Button pos={'absolute'} margin={2} onClick={handleClick} size={'xs'} variant={'subtle'} colorPalette={'green'}><RiStackshareLine /></Button>
            </Tooltip>
            <Center py={10}>
                <VStack w="80%">
                    {/* spotlight */}
                    <Box
                        h={4}
                        mb={2}
                        w="80%"
                        bg="white"
                        boxShadow="var(--shadow-elevation-high)"
                    />

                    <Text
                        color="white"
                        fontFamily="'Delius', cursive"
                        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                        textAlign={'center'}
                        css={{
                            ".Typewriter__wrapper span": {
                                opacity: 0,
                                animation: "fadeIn 0.3s forwards",
                            },
                            ".Typewriter__wrapper span:nth-child(n)": {
                                animationDelay: "calc(var(--char-index) * 0.05s)",
                            },
                            "@keyframes fadeIn": {
                                to: { opacity: 1 },
                            },
                        }}
                    >
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString(topTask).start();
                            }}
                            options={{
                                cursor: "",
                                delay: 40, // faster and smoother
                            }}
                        />
                    </Text>
                </VStack>
            </Center>
        </Box>
    );
}

export default Hero;
