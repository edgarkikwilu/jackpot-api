/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('participants').del()
  await knex('participants').insert([
    {id: 1, name: 'Edgar Kikwilu', phoneNumber: '0763006587'},
    {id: 2, name: 'Dismas Kali', phoneNumber: '0656724750'},
    {id: 3, name: 'Aidan Nyamhanga', phoneNumber: '0714673249'},
  ]);
};
