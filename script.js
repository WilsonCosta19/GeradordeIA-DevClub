/*
Variavel = pedacinho de memoria 
que eu posso guarda oque eu quiser

Função = e uma pedacinho de CODIGO que so EXECUTA quando é chamado
Algoritimo = Receita de bolo 
Logica de Programação = fazer o bolo 

[ ] Saber quem e o botão
[ ] Saer quando o botão foi clicado
[ ] Saber quem e a textarea
[ ] Pegar o que tem dentro dele 
[ ] Enviar para a IA
[ ] Pegar a respota da IA e colocar na Tela 

// Ir no HTML e pegar o Botao
// HTML = Document ( Documento)
// Selecionar (queryselector)
// quem? Botao
// apelido para o botao - classes ( class)
// fetch = ferramenta do JS paar se comunicar com servidor
// async/await = esperar a resposta do servidor para continuar o codigo

*/
// decobri qume e o botao
let botao = document.querySelector(".botao-gerar")
let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

// criei a função que sera chamada quando clicar
// no botao
async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    //  endereço e configuraçoes     
    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [{
                role: "system",
                content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },

            {
                role: "user",
                content: textoUsuario
            }
            ]
        })

    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado
    
    
    
    console.log(dados)
}
// ficar de olho no botao quando chamado gerar codigo
botao.addEventListener("click", gerarCodigo)