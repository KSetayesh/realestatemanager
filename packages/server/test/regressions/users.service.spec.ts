// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from '../../src/users/services/users.service';
// import * as fs from 'fs';
// import { UserDTO } from '@realestatemanager/shared';
// import path from 'path';

describe('UsersService', () => {
    // let service: UsersService;

    // beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //         providers: [UsersService],
    //     }).compile();

    //     service = module.get<UsersService>(UsersService);
    // });

    // it('should be defined', () => {
    //     expect(service).toBeDefined();
    // });

    // it('Emails should be', () => {
    //     const assertionFilePath: string = path.resolve(__dirname, '../assertions/user_emails.json');

    //     const users: UserDTO[] = [
    //         {
    //             "id": 1,
    //             "name": "John Doe",
    //             "email": "john@example.com",
    //             "password": "123"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Jane Smith",
    //             "email": "jane@example.com",
    //             "password": "1234"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Lex Holmes",
    //             "email": "Lex@example.com",
    //             "password": "12345"
    //         },
    //         {
    //             "id": 4,
    //             "name": "Charles Barkley",
    //             "email": "Chuck@example.com",
    //             "password": "123456"
    //         }
    //     ];

    //     const actualValues: string[] = service.getAllUserEmails(users);

    //     const expectedValues: string[] = getEmailsFromFile(assertionFilePath);

    //     expect(actualValues).toEqual(expectedValues);
    // });

});

// // Function to read JSON file and return a string array of email addresses
// function getEmailsFromFile(filePath: string): string[] {
//     // Read the file
//     const fileContent = fs.readFileSync(filePath, 'utf8');

//     // Parse the JSON content
//     const jsonData = JSON.parse(fileContent);

//     // Map the parsed data to an array of email strings
//     return jsonData.map((item: { email: string }) => item.email);

// }


