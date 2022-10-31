import {Box, Image, Text, Button, Textarea, Progress, RadioGroup, Radio, Stack} from '@chakra-ui/react'
import {NextSeo} from 'next-seo'
import {useState} from "react";
import axios from 'axios';

export function MBTI(EI: number, NS: number, TF: number, PJ: number, AB: number) {
    let E_I: string = "";
    let N_S: string = "";
    let T_F: string = "";
    let P_J: string = "";
    let A_B: string = "";

    (EI >= 70) ? (E_I = "E") : ((EI <= 30) ? (E_I = "I") : E_I = "_");
    (NS >= 70) ? (N_S = "N") : ((NS <= 30) ? (N_S = "S") : N_S = "_");
    (TF >= 70) ? (T_F = "T") : ((TF <= 30) ? (T_F = "F") : T_F = "_");
    (PJ >= 70) ? (P_J = "P") : ((PJ <= 30) ? (P_J = "J") : P_J = "_");
    (AB >= 70) ? (A_B = "A") : ((AB <= 30) ? (A_B = "B") : A_B = "_");

    return E_I + N_S + T_F + P_J + "-" + A_B
}

export default function Home() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [EI, setEI] = useState(50);
    const [NS, setNS] = useState(50);
    const [TF, setTF] = useState(50);
    const [PJ, setPJ] = useState(50);
    const [AB, setAB] = useState(50);
    const changeValue = () => {
        axios
            .get(`http://cheokcheok.poomang.com/calculate/${question}@${answer}`)
            .then((response: any) => {
                response = JSON.parse(response.data.score)
                console.log(response)
                setEI(response["E-I(외향성)"])
                setNS(response["N-S(개방성)"])
                setTF(response["T-F(우호성)"])
                setPJ(response["P-J(성실성)"])
                setAB(response["A-B(신경성)"])

            });
    };

    const reRender = () => {
        setQuestion("")
        setAnswer("")
        setEI(50)
        setNS(50)
        setTF(50)
        setPJ(50)
        setAB(50)
    }
    return (
        <Box>
            <NextSeo
                title="망디의 MBTI 연구소"
                openGraph={{
                    title: 'PhD.Mangd',
                    description: '망디의 MBTI 연구소',
                    images: [
                        {url: '/dev_mangd.png'},
                    ]
                }}
            />

            <Box width="100%" height="100%">
                <Box height="8vh" bg={"white"} border={"1px"} borderColor={"gray.200"} display="flex"
                     justifyContent={"start"} alignItems={"center"}>
                    <Image src={"/poomang_logo.v2.png"} h={"20px"} ml={"5px"} pl={4}></Image>
                    <Box fontSize={"xl"} ml={"8"}> 망디의 MBTI 연구소 </Box>
                </Box>
                <Box h={"92vh"} display={"flex"} justifyContent={"space-between"}>
                    <Box></Box>
                    <Box w={"40vw"} display={"flex"} flexDirection={"column"} alignItems={"center"}
                         justifyContent={"center"}>
                        <Box>
                            <Box>
                                <Text mb='20px' fontSize={"3xl"}>🙋 질문 입력란</Text>
                                <Textarea
                                    placeholder='질문을 입력해주세요'
                                    size='2xl'
                                    h={"30vh"}
                                    w={"30vw"}
                                    borderRadius={"10"}
                                    borderColor={"gray.400"}
                                    p={"16px"}
                                    mb={5}
                                    fontSize={"2xl"}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    value={question}
                                />
                            </Box>
                            <Box>
                                {/*<Text fontSize={"xl"} mb='8px'>답변 입력란</Text>*/}
                                {/*<Textarea*/}
                                {/*    placeholder='답변을 입력해주세요'*/}
                                {/*    size='2xl'*/}
                                {/*    h={"30vh"}*/}
                                {/*    w={"30vw"}*/}
                                {/*    borderRadius={"10"}*/}
                                {/*    borderColor={"gray.400"}*/}
                                {/*    p={"16px"}*/}
                                {/*    fontSize={"2xl"}*/}
                                {/*    onChange={(e) => setAnswer(e.target.value)}*/}
                                {/*    value={answer}*/}
                                {/*/>*/}
                                <Text fontSize={"3xl"} mb='20px'>🧑‍💻 답변 입력란</Text>
                                <RadioGroup fontSize={"3xl"}>
                                    <Stack direction='column'>
                                        <Radio size='lg' onChange={(e) => setAnswer(e.target.value)} value='매우 그렇다'>매우
                                            그렇다</Radio>
                                        <Radio size='lg' onChange={(e) => setAnswer(e.target.value)} value='대체로 그렇다'>대체로
                                            그렇다</Radio>
                                        <Radio size='lg' onChange={(e) => setAnswer(e.target.value)}
                                               value='보통이다'>보통이다</Radio>
                                        <Radio size='lg' onChange={(e) => setAnswer(e.target.value)} value='대체로 그렇지 않다'>대체로
                                            그렇지 않다</Radio>
                                        <Radio size='lg' onChange={(e) => setAnswer(e.target.value)} value='전혀 그렇지 않다'>전혀
                                            그렇지 않다</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box w={"15vw"} display={"flex"} flexDirection={"column"} alignItems={"center"}
                         justifyContent={"center"}>
                        <Box>
                            <Button onClick={() => reRender()} p={12} maxWidth={"max-content"} fontSize={"3xl"} m={3}>
                                새로고침
                            </Button>
                            <Button onClick={() => changeValue()} p={12} bg={"#4164FA"} fontSize={"3xl"} m={3}
                                    textColor={"white"} maxWidth={"max-content"}>
                                추출하기
                            </Button>
                        </Box>
                    </Box>
                    <Box w={"40vw"} display={"flex"} flexDirection={"column"} alignItems={"center"}
                         justifyContent={"center"}>
                        <Box width={"80%"}>
                            <Box m={"3"} pb={"10"}>
                                <Text fontSize={"4xl"} bg={"#4164FA"} textColor={"white"} borderRadius={"10"} maxWidth={"max-content"} pr={"5"} pl={"5"}>{MBTI(EI, NS, TF, PJ, AB)}</Text>
                            </Box>
                            <Box m={"3"} pb={"5"}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Text>(E) {Math.ceil(EI * 10) / 10}% </Text>
                                    <Text>(I) {Math.ceil((100 - EI) * 10) / 10}% </Text>
                                </Box>
                                <Box display={"flex"}>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={(EI >= 50) ? (EI - 50) * 2 : 0} transform={"rotate(180deg)"}/>
                                    <Box h={"15px"} w={"1"} bg={"red"}/>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={EI <= 50 ? (50 - EI) * 2 : 0}/>
                                </Box>
                            </Box>
                            <Box m={"3"} pt={"5"} pb={"5"}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Text>(N) {Math.ceil(NS * 10) / 10}% </Text>
                                    <Text>(S) {Math.ceil((100 - NS) * 10) / 10}% </Text>
                                </Box>
                                <Box display={"flex"}>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={(NS >= 50) ? (NS - 50) * 2 : 0} transform={"rotate(180deg)"}/>
                                    <Box h={"15px"} w={"1"} bg={"red"}/>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={NS <= 50 ? (50 - NS) * 2 : 0}/>
                                </Box>
                            </Box>
                            <Box m={"3"} pt={"5"} pb={"5"}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Text>(T) {Math.ceil(TF * 10) / 10}% </Text>
                                    <Text>(F) {Math.ceil((100 - TF) * 10) / 10}% </Text>
                                </Box>
                                <Box display={"flex"}>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={(TF >= 50) ? (TF - 50) * 2 : 0} transform={"rotate(180deg)"}/>
                                    <Box h={"15px"} w={"1"} bg={"red"}/>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={TF <= 50 ? (50 - TF) * 2 : 0}/>
                                </Box>
                            </Box>
                            <Box m={"3"} pt={"5"} pb={"5"}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Text>(P) {Math.ceil(PJ * 10) / 10}% </Text>
                                    <Text>(J) {Math.ceil((100 - PJ) * 10) / 10}% </Text>
                                </Box>
                                <Box display={"flex"}>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={(PJ >= 50) ? (PJ - 50) * 2 : 0} transform={"rotate(180deg)"}/>
                                    <Box h={"15px"} w={"1"} bg={"red"}/>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={PJ <= 50 ? (50 - PJ) * 2 : 0}/>
                                </Box>
                            </Box>
                            <Box m={"3"} pt={"5"}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Text>(A) {Math.ceil((AB) * 10) / 10}% </Text>
                                    <Text>(B) {Math.ceil((100 - AB) * 10) / 10}% </Text>
                                </Box>
                                <Box display={"flex"}>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={(AB >= 50) ? (AB - 50) * 2 : 0} transform={"rotate(180deg)"}/>
                                    <Box h={"15px"} w={"1"} bg={"red"}/>
                                    <Progress flex={1} colorScheme={"messenger"} height='15px'
                                              value={AB <= 50 ? (50 - AB) * 2 : 0}/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box></Box>
                </Box>
            </Box>
        </Box>
    )
}
