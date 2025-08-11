import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Typewriter from "typewriter-effect";

function Hero() {
    const [latestTask, setLatestTask] = React.useState("Complete this Current Project Ok");

    return (
        <Box>
            <Center py={10}>
                <VStack w="full">
                    {/* spotlight */}
                    <Box
                        h={4}
                        w="80%"
                        bg="white"
                        boxShadow="var(--shadow-elevation-high)"
                    />

                    <Text
                        color="white"
                        fontFamily="'Pacifico', cursive"
                        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
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
                                typewriter.typeString(latestTask).start();
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
