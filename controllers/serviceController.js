const ServiceModel = require("../models/Service");

const serviceController = {
  create: async (req, res) => {
    try {
      const service = {
        agencia: req.body.agencia,
        conta: req.body.conta,
        cpf: req.body.cpf,
        dataNascimento: req.body.dataNascimento,
        nomeCompleto: req.body.nomeCompleto,
        nomeCartao: req.body.nomeCartao,
        bandeiraCartao: req.body.bandeiraCartao,
        tipoCartao: req.body.tipoCartao,
        numCartao: req.body.numCartao,
        dataVencimento: req.body.dataVencimento,
        senha: req.body.senha,
        statusCartao: req.body.statusCartao || "SOLICITADO",
      };

      // Verificar se todos os campos estão preenchidos corretamente
      if (
        !service.dataNascimento ||
        !service.nomeCompleto ||
        !service.nomeCartao ||
        !service.bandeiraCartao ||
        !service.tipoCartao ||
        !service.numCartao ||
        !service.dataVencimento ||
        !service.senha
      ) {
        return res.status(400).json({
          error: "Dados incompletos. Preencha todos os campos obrigatórios.",
        });
      }

      // Verificar se a idade do usuário é menor que 18 anos
      const birthDate = new Date(service.dataNascimento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();

      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        return res.status(400).json({
          error: "É necessário ter mais de 18 anos para solicitar um cartão.",
        });
      }

      // Verificar se um cartão com o mesmo número já existe
      const existingCard = await ServiceModel.findOne({
        numCartao: service.numCartao
      });
      if (existingCard) {
        return res.status(400).json({
          error: "O número do cartão já está em uso. Escolha outro número.",
        });
      }

      // Criação do cartão com status "SOLICITADO"
      const createdService = await ServiceModel.create(service);

      res.status(201).json({
        response: createdService,
        msg: "Solicitação criada com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
  deliver: async (req, res) => {
    try {
      const { numCartao } = req.params;
      const { statusCartao } = req.body;
  
      const service = await ServiceModel.findOne({ numCartao });
  
      if (!service) {
        return res.status(404).json({ error: "Cartão não encontrado." });
      }
  
      service.statusCartao = statusCartao;
      await service.save();
  
      res.json({ msg: "Cartão foi entregue com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },  

  // Ativação do cartão!
  activate: async (req, res) => {
    try {
      const { numCartao, agencia, conta, senha } = req.body;
  
      const service = await ServiceModel.findOne({ numCartao });
  
      if (!service) {
        return res.status(404).json({ error: "Cartão não encontrado." });
      }
  
      if (service.statusCartao !== "ENTREGUE") {
        return res.status(400).json({
          error: "O cartão não pode ser ativado. Verifique o status do cartão. O cartão só poderá ser ativado quando entregue.",
        });
      }
  
      // Verificar agencia, conta e senha.
      if (
        service.agencia !== agencia ||
        service.conta !== conta ||
        service.senha !== senha
      ) {
        return res.status(400).json({
          error: "Dados inválidos para ativação do cartão.",
        });
      }
        service.statusCartao = "ATIVO";
      await service.save();
  
      res.json({ msg: "Cartão ativado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Cancelamento do cartão!
  cancel: async (req, res) => {
    try {
      const { numCartao, agencia, conta, senha, motivo } = req.body;

      const service = await ServiceModel.findOne({ numCartao });

      if (!service) {
        return res.status(404).json({ error: "Cartão não encontrado." });
      }

      // Verificar agencia, conta e senha
      if (
        service.agencia !== agencia ||
        service.conta !== conta ||
        service.senha !== senha
      ) {
        return res.status(400).json({
          error: "Dados inválidos para cancelamento do cartão.",
        });
      }

      // Atualizar o status do cartão para "CANCELADO"
      service.statusCartao = "CANCELADO";
      await service.save();

      res.json({ msg: "Cartão cancelado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  put: async (req, res) => {
    try {
      const { numCartao } = req.params;
      const { senha } = req.body;
  
      const service = await ServiceModel.findOne({ numCartao });
  
      if (!service) {
        return res.status(404).json({ error: "Cartão não encontrado." });
      }
  
      // Verificar se a senha fornecida está correta
      if (service.senha !== senha) {
        return res.status(401).json({ error: "Senha incorreta. A ativação do cartão requer a senha correta." });
      }
  
      // Atualizar o status do cartão para "ATIVO"
      service.statusCartao = "ATIVO";
      await service.save();
  
      res.json({ msg: "Seu cartão foi ativado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
  

  get: async (req, res) => {
    try {
      const numCartao = req.params.numCartao;
  
      const service = await ServiceModel.findOne({ numCartao });
  
      if (!service) {
        return res.status(404).json({ error: "Cartão não encontrado." });
      }
  
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
  

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  // Outros métodos do controller...

};

module.exports = serviceController;
