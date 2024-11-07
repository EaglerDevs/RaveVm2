function convertToPython() {
    // Grab the Java code from the textarea
    var javaCode = document.getElementById('javaCode').value;

    // Convert Java code to Python with some basic rules
    var pythonCode = javaCode
        // Handle printing (System.out.println)
        .replace(/System\.out\.println\((.*?)\);/g, 'print($1)')

        // Handle Java's main method and function signature
        .replace(/public\s+static\s+void\s+main\s*\(String\[\]\s+args\)/g, 'def main():')

        // Handle class declaration (remove the concept of public/private)
        .replace(/public\s+class\s+(\w+)/g, 'class $1:')
        .replace(/private\s+/g, '# Private - Not needed in Python')
        .replace(/protected\s+/g, '# Protected - Not needed in Python')

        // Handle constructors (simplified)
        .replace(/public\s+(\w+)\(\)/g, 'def __init__(self):')

        // Handle basic Java types (int, boolean, String, etc.)
        .replace(/\bint\b/g, 'int')
        .replace(/\bboolean\b/g, 'bool')
        .replace(/\bString\b/g, 'str')
        .replace(/\bfloat\b/g, 'float')
        .replace(/\bdouble\b/g, 'float') // Convert double to float in Python

        // Handle array declaration and initialization
        .replace(/\b(\w+)\[\]\s+(\w+)\s*=\s*new\s+(\w+)\[\d+\];/g, '$2 = [$3() for _ in range($3)]') // Array initialization (simplified)
        .replace(/\b(\w+)\[\]\s+(\w+)\s*=\s*\{(.*?)\};/g, '$2 = [$3]') // Array initialization with values

        // Handle Java for loop
        .replace(/for\s*\(\s*(\w+)\s+(\w+)\s*=\s*(\d+)\s*;\s*(\w+)\s*<\s*(\d+)\s*;\s*(\w+)\+\+\)/g, 'for $2 in range($3, $5):')

        // Handle Java while loop
        .replace(/while\s*\((.*?)\)\s*\{/g, 'while $1:')

        // Handle if/else statement
        .replace(/if\s*\((.*?)\)\s*\{/g, 'if $1:')
        .replace(/else\s*\{/g, 'else:')

        // Handle return statements
        .replace(/\breturn\b/g, 'return')

        // Remove semicolons (not needed in Python)
        .replace(/;/g, '')

        // Handle LWJGL specific library references (placeholder)
        .replace(/\borg\.lwjgl\.sys\.(\w+)\b/g, '# LWJGL Library: org.lwjgl.' + '$1')

        // Handle basic Java collection classes (ArrayList, etc.)
        .replace(/ArrayList<(\w+)>/g, 'list')

        // Handle generic import statements (placeholder)
        .replace(/import\s+(\w+\.\w+);\s*/g, '# import statement - needs to be handled for Python')

    // Display the converted Python code in the "pythonCode" div
    document.getElementById('pythonCode').innerText = pythonCode;
}
